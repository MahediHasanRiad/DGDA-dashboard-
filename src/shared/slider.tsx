import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

interface SliderFieldProps {
  images: string[]
}

export function SliderField({ images }: SliderFieldProps) {
  return (
    <Carousel className="w-full h-full group">
      <CarouselContent className="w-full h-full ml-0">
        {images.map((img, index) => (
          <CarouselItem key={index} className="pl-0 w-full h-full flex-shrink-0">
            <div className="w-full h-full relative block">
              <img 
                src={img} 
                alt={`Patrol attachment view ${index + 1}`} 
                className="w-full h-full block object-cover select-none pointer-events-none"
              />
              
              <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold text-white rounded-md tracking-wider">
                {index + 1} / {images.length}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}