"use client";
import React from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
}

export function CartItem({
  id = "",
  name = "",
  price = 0,
  quantity = 1,
  imageUrl = "",
  onRemove = () => {},
  onUpdateQuantity = () => {},
}: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const totalPrice = price * quantity;

  const handleIncrement = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  return (
    <motion.div
      className="flex items-center py-4 border-b border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      data-component="CartItem"
    >
      {/* Product Image */}
      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      {/* Product Information */}
      <div className="ml-4 flex-grow">
        <h4 className="font-sans font-medium text-foreground">{name}</h4>
        <p className="text-sm text-muted-foreground">
          {formatPrice(price)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center mx-2">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="p-1 rounded-full bg-muted hover:bg-primary/10 text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="mx-2 min-w-[24px] text-center font-medium">
          {quantity}
        </span>

        <button
          onClick={handleIncrement}
          className="p-1 rounded-full bg-muted hover:bg-primary/10 text-foreground"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Total Price */}
      <div className="w-20 text-right mr-2">
        <span className="font-medium text-foreground">
          {formatPrice(totalPrice)}
        </span>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
        aria-label={`Remove ${name} from cart`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
