import { Box, Button, CloseButton, Dialog, Heading, HStack, IconButton, Image, Input, Portal, Text, VStack } from "@chakra-ui/react"
import { LuDelete } from "react-icons/lu"
import { TiEdit } from "react-icons/ti"
import { useColorModeValue } from "./ui/color-mode"
import { useProductStore } from "@/store/product"
import { toaster } from "./ui/toaster"
import { useState } from "react"

type Props = {
  name: string,
  price: string,
  image: string
  _id?: string
}

function ProductCard({ product }: { product: Props}) {
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')
  const [updatedProduct, setUpdatedProduct] = useState(product)
  
  


  const { deleteProduct, updateProduct } = useProductStore()

  const handleDeleteProduct = async ( pid: string ) => {
    const { success, message } = await deleteProduct(pid)

    if (!success) {
      toaster.error({
        title: 'Error',
        description: message,
        duration: 3000
      })
    } else {
      toaster.success({
        title: '刪除產品成功',
        description: message,
        duration: 3000
      })
    }
  }

  const handleUpdateProduct = async (pid: string, updatedProduct: Props) => {
    const { success, message } = await updateProduct(pid, updatedProduct)
    if (!success) {
      toaster.error({
        title: 'Error',
        description: message,
        duration: 3000
      })
    } else {
      toaster.success({
        title: '修改成功',
        description: message,
        duration: 3000
      })
    }
  }


  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s ease'}
      _hover={{
        transform: 'translateY(-5px)',
        shadow: 'xl'
      }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={'full'}
        objectFit={'cover'}
      />

      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spaceX={2}>
          <Dialog.Root lazyMount closeOnInteractOutside={false}>
            <Dialog.Trigger asChild>
              <IconButton bgColor={'blue.500'} _hover={{bgColor: 'blue.400'}}>
                <TiEdit />
              </IconButton>
            </Dialog.Trigger>

            <IconButton
              bgColor={'red.500'}
              _hover={{bgColor: 'red.600'}}
              onClick={() => handleDeleteProduct(product._id!)}  
            >
              <LuDelete />
            </IconButton>


            <Portal>
              <Dialog.Backdrop />

              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton bg={'bg.muted'} size={'sm'} />
                  </Dialog.CloseTrigger>

                  <Dialog.Header>
                    <Dialog.Title>
                      修改產品
                    </Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <VStack spaceY={4}>
                      <Input
                        placeholder="產品名稱"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                      />

                      <Input
                        placeholder="產品價格"
                        name="price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                      />

                      <Input
                        placeholder="圖片連結"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}  
                      />
                    </VStack>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button
                        bg={'blue.500'}
                        _hover={{bg: 'blue.400'}}
                        onClick={() => handleUpdateProduct(product._id!, updatedProduct)}  
                        >
                        修改
                      </Button>
                    </Dialog.ActionTrigger>

                    <Dialog.ActionTrigger asChild>
                      <Button variant={'ghost'}>取消</Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </HStack>
      </Box>


      
        
      
    </Box>
  )
}
export default ProductCard