import { Container } from "@/components/ui/container";
import { ProductCardSkeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <Container className="flex flex-col gap-6 py-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
}
