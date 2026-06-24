<template>
  <section class="py-12 bg-[#1a2128]">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="grid grid-cols-3 md:flex md:items-center md:gap-8">
            <button class="pb-2 transition-colors relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad2 lucide-gamepad-2 w-5 h-5 md:w-4 md:h-4">
                <line x1="6" x2="10" y1="11" y2="11">
                </line>
                <line x1="8" x2="8" y1="9" y2="13">
                </line>
                <line x1="15" x2="15.01" y1="12" y2="12">
                </line>
                <line x1="18" x2="18.01" y1="10" y2="10">
                </line>
                <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z">
                </path>
              </svg>
              <span class="text-xs md:text-base">Mini Game</span>
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700">
                <div class="h-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] transition-all duration-100" style="width: 46%;">
                </div>
              </div>
            </button>
            <button class="pb-2 transition-colors relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 text-gray-500 hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cherry w-5 h-5 md:w-4 md:h-4">
                <path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z">
                </path>
                <path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z">
                </path>
                <path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12">
                </path>
                <path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z">
                </path>
              </svg>
              <span class="text-xs md:text-base">Slot Game</span>
            </button>
            <button class="pb-2 transition-colors relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 text-gray-500 hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video w-5 h-5 md:w-4 md:h-4">
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5">
                </path>
                <rect x="2" y="6" width="14" height="12" rx="2">
                </rect>
              </svg>
              <span class="text-xs md:text-base">Live Game</span>
            </button>
          </div>
          <div class="flex items-center justify-end gap-2">
            <a class="text-gray-400 hover:text-white text-xs px-3 py-1.5 border border-gray-700 rounded transition-colors" href="/mini-games">Show all</a>
            <button class="text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-4 h-4">
                <path d="m15 18-6-6 6-6">
                </path>
              </svg>
            </button>
            <button class="text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right w-4 h-4">
                <path d="m9 18 6-6-6-6">
                </path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-hidden">
        <div class="flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-4 animate-slideIn">
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200" alt="Mega Fortune" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Mega Fortune</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200" alt="Starburst" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Starburst</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200" alt="Limbo" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Limbo</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200" alt="Mines" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Mines</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-200" alt="Plinko" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Plinko</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-200" alt="Dice" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Dice</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200" alt="Tower" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Tower</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200" alt="Keno" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Keno</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200" alt="Hilo" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Hilo</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200" alt="Wheel" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Wheel</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-200" alt="Crash" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Crash</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-200" alt="Coin Flip" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Coin Flip</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200" alt="Rocket" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Rocket</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200" alt="Caves" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Caves</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200" alt="Video Poker" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Video Poker</h3>
          </div>
          <div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">
              <img src="/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200" alt="Scratch Card" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            <h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">Scratch Card</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
