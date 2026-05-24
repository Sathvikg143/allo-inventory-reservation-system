"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Inventory = {
  id: string;
  totalStock: number;
  reservedStock: number;
  warehouseId: string;
  warehouse?: {
    name: string;
  };
};

type Product = {
  id: string;
  name: string;
  inventories: Inventory[];
};

export default function Home() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const router =
    useRouter();

  useEffect(() => {
    async function load() {
      try {
        const res =
          await fetch(
            "/api/products"
          );

        const data =
          await res.json();

        setProducts(
          data
        );
      } catch {
        alert(
          "Failed to load products"
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    load();
  }, []);

  async function reserve(
    productId: string
  ) {
    try {
      const res =
        await fetch(
          "/api/reservations",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                {
                  productId,
                  quantity: 1,
                }
              ),
          }
        );

      const data =
        await res.json();

      if (
        res.status ===
        409
      ) {
        alert(
          "Insufficient stock"
        );

        return;
      }

      if (
        !res.ok
      ) {
        alert(
          data.error ||
            "Reservation failed"
        );

        return;
      }

      router.push(
        `/checkout/${data.id}`
      );

    } catch {
      alert(
        "Server error"
      );
    }
  }

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-8">
        Inventory Reservation System
      </h1>

      {loading ? (
        <div>
          Loading...
        </div>
      ) : (
        <div className="space-y-6">

          {products.map(
            (
              product
            ) => (
              <div
                key={
                  product.id
                }
                className="border rounded p-6"
              >

                <h2 className="text-2xl font-semibold">
                  {
                    product.name
                  }
                </h2>

                <div className="mt-3">

                  {product.inventories.map(
                    (
                      inv
                    ) => (
                      <div
                        key={
                          inv.id
                        }
                        className="mb-4"
                      >

                        <div>
                          Warehouse:
                          {" "}
                          {inv
                            .warehouse
                            ?.name ||
                            inv.warehouseId}
                        </div>

                        <div>
                          Available:
                          {" "}
                          {inv.totalStock -
                            inv.reservedStock}
                        </div>

                      </div>
                    )
                  )}

                </div>

                <button
                  onClick={() =>
                    reserve(
                      product.id
                    )
                  }

                  className="mt-3 px-5 py-2 border rounded"
                >
                  Reserve
                </button>

              </div>
            )
          )}

        </div>
      )}

    </main>
  );
}