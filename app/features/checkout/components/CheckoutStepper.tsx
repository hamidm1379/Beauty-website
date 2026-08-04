"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  MapPinned,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

interface CheckoutStepperProps {
  currentStep?: number;
}

const steps = [
  {
    id: 1,
    title: "سبد خرید",
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "اطلاعات ارسال",
    icon: MapPinned,
  },
  {
    id: 3,
    title: "پرداخت",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "تکمیل سفارش",
    icon: CheckCircle2,
  },
];

export default function CheckoutStepper({
  currentStep = 2,
}: CheckoutStepperProps) {
  return (
    <section className="rounded-2xl sm:rounded-4xl border border-gray-100 bg-white p-3 sm:p-6 shadow-sm">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = step.id < currentStep;
          const active = step.id === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <Fragment key={step.id}>
              {/* Step */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.12,
                }}
                className="flex shrink-0 flex-col items-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                  }}
                  className={`relative flex h-9 w-9 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${completed ? "border-green-500 bg-green-500 text-white shadow-lg shadow-green-200" : active ? "border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-200" : "border-gray-200 bg-gray-50 text-gray-400"}`}
                >
                  {completed ? (
                    <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6" />
                  ) : (
                    <Icon className="h-4 w-4 sm:h-[22px] sm:w-[22px]" />
                  )}
                </motion.div>

                <span
                  className={`mt-1.5 sm:mt-3 max-w-[52px] text-center text-[8px] leading-tight sm:max-w-none sm:whitespace-nowrap sm:text-sm sm:leading-normal font-semibold ${completed ? "text-green-600" : active ? "text-pink-600" : "text-gray-500"}`}
                >
                  {step.title}
                </span>
              </motion.div>

              {/* Line */}

              {!isLast && (
                <div key={`line-${step.id}`} className="mx-1.5 mb-6 flex-1 sm:mx-4 sm:mb-8">
                  <div className="relative h-1 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width:
                          currentStep > step.id
                            ? "100%"
                            : "0%",
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.15,
                      }}
                      className="h-full rounded-full bg-linear-to-r from-pink-500 to-rose-500"
                    />
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}