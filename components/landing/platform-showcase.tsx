"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, Search, Volume2 } from "lucide-react"
export function PlatformShowcase() {
  return (
    <section className="py-28 md:py-36 bg-white relative">
      <div className="max-w-[85rem] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[6fr_4fr_3fr] gap-10 lg:gap-16 xl:gap-20 items-center relative">
            
            {/* Left Area: Large vertical visual card */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 h-[580px] md:h-[680px] lg:h-[720px] rounded-3xl overflow-hidden relative shadow-lg group w-full max-w-[580px] lg:max-w-none aspect-[4/5] mx-auto lg:mx-0">
              <Image 
                src="/images/5da293c146555d59c2579587ad3a6456.jpg" 
                alt="Clinical Intelligence Engine" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-1 w-max max-w-[90%]">
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-5 py-3 shadow-md">
                  <span className="font-medium text-neutral-900 text-[15px]">
                    Clinical Intelligence Engine
                  </span>
                </div>
                <button className="w-11 h-11 rounded-full bg-neutral-100/95 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 shadow-md transition-colors backdrop-blur-sm">
                  <ArrowUpRight className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>

            {/* Center Area: Short content block */}
            <div className="col-span-1 lg:col-span-1 lg:pl-6 xl:pl-10 flex flex-col justify-between h-full z-10 w-full py-6 md:py-8 lg:py-6 relative">
              <div className="mb-10 lg:mb-16 mt-2 max-w-[280px]">
                <p className="text-[13px] text-neutral-800 font-medium leading-relaxed mb-5">
                  Driven by a rich history of expertise and a relentless pursuit of scientific excellence
                </p>
                <button className="bg-black hover:bg-neutral-800 text-white rounded-full px-7 py-2.5 text-[11px] font-bold tracking-widest transition-all shadow-md hover:-translate-y-0.5 w-fit uppercase">
                  Learn More
                </button>
              </div>
              
              <ul className="space-y-6 lg:space-y-8 mt-auto">
                <li className="flex items-center gap-4 text-[16px] md:text-[17px] font-medium tracking-tight text-neutral-800">
                  <div className="shrink-0 w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  Unparalleled Diagnostics
                </li>
                <li className="flex items-center gap-4 text-[16px] md:text-[17px] font-medium tracking-tight text-neutral-800">
                  <div className="shrink-0 w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  Global Reach
                </li>
                <li className="flex items-center gap-4 text-[16px] md:text-[17px] font-medium tracking-tight text-neutral-800">
                  <div className="shrink-0 w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  Research Excellence
                </li>
              </ul>
            </div>

            {/* Right Area: Small floating preview card & Text */}
            <div className="col-span-1 lg:col-span-1 flex flex-col items-center lg:items-end justify-start h-full mt-10 lg:-mt-4 w-full">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-full max-w-[280px] aspect-[4/5] relative z-20 group mb-14 sm:mb-20 lg:-mr-4 xl:-mr-8"
              >
                {/* Image Background */}
                <div className="absolute inset-0 rounded-[2rem] bg-neutral-200/50 overflow-hidden shadow-sm hover:-translate-y-2 transition-transform duration-500">
                  <Image 
                    src="/images/0131dc87dc5f814536ade41d7099b739.jpg" 
                    alt="Structured Knowledge Modules" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                  />
                </div>
                
                {/* Bottom Left Glass Overlay - Overhanging */}
                <div className="absolute -bottom-10 -left-4 sm:-bottom-12 sm:-left-6 bg-white/40 backdrop-blur-xl w-[85%] p-5 rounded-[1.25rem] z-30 border border-white/40 shadow-[0_15px_40px_rgb(0,0,0,0.1)] group-hover:-translate-y-2 transition-transform duration-500">
                  <h4 className="font-semibold text-neutral-900 text-[16px] leading-[1.1] tracking-tight">
                    Good<br/>
                    interaction<br/>
                    with other<br/>
                    molecules
                  </h4>
                  <button className="text-[10px] font-semibold bg-[#8B7FE8] hover:bg-[#796bd4] text-white transition-all px-4 py-1.5 rounded-full w-fit block mt-4 shadow-sm">
                    Learn more
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-[280px] space-y-6 text-[13px] text-neutral-500 font-medium leading-relaxed text-left lg:-mr-4 xl:-mr-8 pr-4"
              >
                <p>
                  We are at the forefront of personalized health, offering unparalleled diagnostic capabilities.
                </p>
                <p>
                  MYDNA has consistently expanded its reach to cater to the evolving needs of healthcare worldwide.
                </p>
                <p>
                  MYDNA excels in the field of oncology research, with accreditation by IAM and CLIA.
                </p>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
