"use client";
import React, { useState } from "react";
import { Truck, Leaf, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/productcard";
import { ShoppingCart } from "@/components/shoppingcart";

export default function Home() {
  // Cart state management
  const [cartItems, setCartItems] = useState<
    Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      imageUrl: string;
    }>
  >([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sample product data
  const featuredProducts = [
    {
      id: "1",
      name: "Heirloom Tomatoes",
      description:
        "Juicy, colorful heirloom tomatoes grown using traditional methods. Perfect for salads and fresh eating.",
      price: 4.99,
      imageUrl:
        "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: "2",
      name: "Roma Tomatoes",
      description:
        "Firm, meaty Roma tomatoes ideal for sauces, canning, and cooking. Rich in flavor with few seeds.",
      price: 3.49,
      imageUrl:
        "https://images.unsplash.com/photo-1598511796432-32663d0875f2?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: "3",
      name: "Cherry Tomatoes",
      description:
        "Sweet, bite-sized cherry tomatoes bursting with flavor. Great for snacking and quick recipes.",
      price: 3.99,
      imageUrl:
        "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: "4",
      name: "Beefsteak Tomatoes",
      description:
        "Large, juicy beefsteak tomatoes perfect for sandwiches and burgers. Full-bodied tomato flavor.",
      price: 5.49,
      imageUrl:
        "https://images.unsplash.com/photo-1592841200221-a6c4c3aee211?auto=format&fit=crop&q=80&w=500",
    },
  ];

  const addToCart = (productId: string) => {
    const product = featuredProducts.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
    setIsCartOpen(false);
  };

  return (
    <div data-component="Home">
      <Navbar
        cartItemCount={cartItems.reduce(
          (total, item) => total + item.quantity,
          0,
        )}
        onCartClick={() => setIsCartOpen(true)}
      />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1200"
            alt="Fresh tomatoes"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-background"
          >
            <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
              Fresh Tomatoes Delivered to Your Door
            </h1>
            <p className="text-lg md:text-xl mb-8 text-background/90">
              Farm-fresh, sustainably grown tomatoes delivered directly from our
              fields to your table. Experience the taste difference.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-600 text-primary-foreground px-8 py-3 rounded-md font-sans font-medium text-lg shadow-lg flex items-center"
            >
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4">
            Welcome to Tomato Harvest
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8 text-lg">
            We're passionate about growing the finest tomatoes using sustainable
            farming practices. Our family farm has been perfecting tomato
            cultivation for three generations, bringing you the best flavors
            nature has to offer.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-background rounded-lg p-6 shadow-md"
            >
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-2">
                Farm Fresh
              </h3>
              <p className="text-muted-foreground">
                Harvested at peak ripeness and delivered within 24 hours for
                maximum freshness and flavor.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-background rounded-lg p-6 shadow-md"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-2">
                Fast Delivery
              </h3>
              <p className="text-muted-foreground">
                Quick and reliable delivery service ensuring your tomatoes
                arrive in perfect condition.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-background rounded-lg p-6 shadow-md"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-muted-foreground">
                We stand behind every tomato we grow with our satisfaction
                guarantee. Love it or it's free.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4">
              Featured Varieties
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of premium tomato varieties, each with its
              unique flavor profile and culinary uses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-sans font-medium shadow-sm hover:bg-secondary-600 transition-colors"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-sans font-bold text-2xl md:text-3xl mb-6">
            Ready to taste the difference?
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-sans font-medium shadow-md hover:bg-primary-600 transition-colors"
          >
            Start Shopping Today
          </motion.button>
        </div>
      </section>
    </div>
  );
}
