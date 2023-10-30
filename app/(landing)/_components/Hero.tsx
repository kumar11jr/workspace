import Image from "next/image";

export default function Hero(){
    return(
        <>
            <div className="flex flex-col items-center justify-center max-w-5xl" >
                <div className="flex items-center" >
                    <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px]" >
                        <Image src="/documents.png" fill className="object-contain"  alt="document" />
                    </div>
                    <div className="relative h-[400px] w-[400px] hidden md:block">
                        <Image fill className="object-contain" src="/reading.png" alt="reading" />
                    </div>
                </div>
            </div>
        </>
    );
}