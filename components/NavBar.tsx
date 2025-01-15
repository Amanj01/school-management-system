import Image from "next/image"
import { useTranslations } from 'next-intl';
import LocaleSwitcher from "./LocaleSwitcher"
const Navbar = () => {

  const t = useTranslations('layout.navbar');

  return (
    <div className='flex items-center  justify-between py-4 px-5 '>
      {/* SEARCH BAR */}
      <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
        <Image src="/search.png" alt="" width={15} height={14}/>
        <input type="text" placeholder={t('searchPlaceholder')} className="w-[200px] p-2 bg-transparent outline-none"/>
      </div>
      {/* ICONS AND USER */}
      <div className='flex items-center gap-3 md:gap-6 justify-end w-full'>
        <LocaleSwitcher />

        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
          <Image src="/announcement.png" alt="" width={20} height={20}/>
          <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>1</div>
        </div>
        <div className='flex flex-col'>
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <Image src="/avatar.png" alt="" width={32} height={32} className="rounded-full"/>
      </div>
    </div>
  )

}
export default Navbar