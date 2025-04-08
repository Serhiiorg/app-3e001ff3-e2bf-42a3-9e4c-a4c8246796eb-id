"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onAddToCart: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart = () => {},
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <motion.div
      className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      data-component="ProductCard"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-sans font-bold text-lg mb-2 text-foreground">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">
          {description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-foreground font-bold text-lg">
            {formatPrice(price)}
          </span>

          <motion.button
            onClick={() => onAddToCart(id)}
            className="bg-primary hover:bg-primary-600 text-primary-foreground rounded-full p-2 flex items-center justify-center group transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
