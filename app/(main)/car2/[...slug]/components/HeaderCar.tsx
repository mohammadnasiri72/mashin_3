import { mainDomain, mainDomainOld } from '@/utils/mainDomain'
import Link from 'next/link'
import React from 'react'

function HeaderCar({detailsCar}:{detailsCar:ItemsId}) {
  return (
    <>
    <div style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/1.webp')`,
        }} className='min-h-100 bg-cover bg-no-repeat bg-center'>
         {/* Breadcrumb */}
          <nav className="">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white! font-bold hover:text-white! transition-colors duration-300"
                >
                  صفحه اصلی
                </Link>
              </li>
              {detailsCar.breadcrumb &&
                detailsCar.breadcrumb.length > 0 &&
                detailsCar.breadcrumb.map((b, i) => (
                  <li key={b.href} className="flex items-center">
                    <span className="text-white/50!">/</span>
                    <Link
                      href={b.href}
                      className="text-white! font-bold hover:text-white! transition-colors duration-300"
                    >
                      {b.title}
                    </Link>
                  </li>
                ))}
            </ol>
          </nav>
    </div>
    </>
  )
}

export default HeaderCar
