import ProductCard from "@/components/ProductCard"
import { useProductStore } from "@/store/product"
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

function HomePage() {
  const { fetchProducts, products } = useProductStore()


  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Container py={12}>
      <VStack>
        <Text
          fontSize={'30px'}
          fontWeight={'bold'}
          bgGradient={'to-r'}
          gradientFrom={'cyan.400'}
          gradientTo={'blue.500'}
          bgClip={'text'}
          textAlign={'center'}
          mb={5}
        >
          現有管理中的產品 🚀
        </Text>


        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          w={'full'}
          columnGap="10"
          rowGap="10"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>


        {products.length === 0 && (
          <Text
            fontSize={'xl'}
            textAlign={'center'}
            fontWeight={'bold'}
            color={'gray.500'}
          >
            目前沒有任何產品！ 😿 &nbsp;&nbsp;
            <Link to={'/create'}>
              <Text
                as={'span'}
                color={'blue.500'}
                _hover={{ textDecoration: 'underline' }}
              >
                前往新增產品🔥
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}
export default HomePage