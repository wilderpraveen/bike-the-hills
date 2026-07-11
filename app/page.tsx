import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black">
        <section className="flex min-h-screen items-center justify-center">
          <h1 className="text-6xl font-bold text-white">
            Bike the Hills
          </h1>
        </section>
      </main>
    </>
  );
}