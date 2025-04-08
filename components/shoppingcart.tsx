"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, ArrowRight, Trash2 } from "lucide-react";
import { CartItem } from "@/components/cartitem";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export function ShoppingCart({
  isOpen = false,
  onClose = () => {},
  cartItems = [],
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
  onClearCart = () => {},
  onCheckout = () => {},
}: ShoppingCartProps) {
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const cartTotal = calculateTotal();
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Animation variants for sidebar
  const sidebarVariants = {
    closed: { x: "100%", opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  // Animation variants for backdrop
  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Cart Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background shadow-xl z-50 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "tween", duration: 0.3 }}
            data-component="ShoppingCart"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
                <h2 className="font-sans font-bold text-lg">Your Cart</h2>
                {itemCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="font-sans font-medium text-lg mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Looks like you haven't added any tomatoes to your cart yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-600 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      imageUrl={item.imageUrl}
                      onRemove={onRemoveItem}
                      onUpdateQuantity={onUpdateQuantity}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-border p-4 bg-card">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-sans text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-sans font-medium">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans font-bold text-lg">Total</span>
                  <span className="font-sans font-bold text-lg">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={onCheckout}
                    className="w-full py-3 bg-primary hover:bg-primary-600 text-primary-foreground font-sans font-medium rounded-md flex items-center justify-center transition-colors"
                  >
                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </button>

                  <button
                    onClick={onClearCart}
                    className="w-full py-2 text-muted-foreground hover:text-destructive font-sans text-sm flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Empty Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
