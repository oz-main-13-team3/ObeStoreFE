import {
  ProductGrid,
  ProductSort,
  useProductFilterStore,
  useProductsQuery,
} from '@/features/product';
import { ErrorMessage, Spinner } from '@/components/ui';
import { useSearchStore } from '@/features/search';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const { searchTerm, setSearchTerm, isOpenSearchModal } = useSearchStore();
  const { sort } = useProductFilterStore();
  const category = searchParams.get('category') ?? undefined;

  useEffect(() => {
    if (isOpenSearchModal) return;
    if (query !== searchTerm) setSearchTerm(query);
  }, [query, searchTerm, setSearchTerm]);

  const {
    data: products,
    isLoading,
    isError,
  } = useProductsQuery({
    sortOption: sort,
    category,
    searchTerm,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message='상품을 불러오는 중 오류가 발생했습니다.' />;

  return (
    <main className='bg-primary-100 p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-xl font-bold'>상품 목록</h1>
        <ProductSort />
      </div>
      {products && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>표시할 상품이 없습니다.</p>
      )}
    </main>
  );
}
