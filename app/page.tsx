import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="relative h-screen bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full items-center justify-center">

          <div className="text-center text-white px-6">

            <p className="uppercase tracking-[0.35em] text-sm mb-5">
              Premium Cycling Adventures
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Ride the Himalayas
            </h1>

            <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-200">
              Discover Spiti Valley through unforgettable cycling adventures,
              local experiences, and breathtaking Himalayan landscapes.
            </p>

          </div>

        </div>

      </section>
    </main>
  );
}