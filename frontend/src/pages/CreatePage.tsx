import { useColorModeValue } from "@/components/ui/color-mode"
import { toaster } from "@/components/ui/toaster"
import { useProductStore } from "@/store/product"
import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react"
import { useState } from "react"

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })

  const { createProduct } = useProductStore()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)

    if (!success) {
      toaster.error({
        title: 'Error',
        description: message,
        duration: 3000
      })
    } else {
      toaster.success({
        title: '新增產品成功',
        description: message,
        duration: 3000
      })
    }

    setNewProduct({
      name: '',
      price: '',
      image: ''
    })
  }

  return (
    <Container maxW={'sm'} pt={'20'}>
      <VStack>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          新增一個新的產品
        </Heading>

        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack spaceY={4}>
            <Input
              placeholder="產品名稱"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
              variant={'subtle'}
            />

            <Input
              placeholder="產品價格"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
              variant={'subtle'}
            />

            <Input
              placeholder="圖片連結"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
              variant={'subtle'}
            />

            <Button
              colorScheme={'dark'}
              w={'full'}
              onClick={handleAddProduct}
            >
              新增產品
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
export default CreatePage