import React from 'react'

function NewsBlogForm() {
  return (
    <>
     <div className="bg-linear-to-br from-red-600 to-red-700 rounded-2xl p-6 ">
        <h3 className="text-lg font-bold mb-2! text-white!">
          خبرنامه تخصصی خودرو
        </h3>
        <p className="text-sm text-red-100! mb-4!">
          آخرین اخبار و تحلیل‌های بازار خودرو را دریافت کنید
        </p>
        <div className="space-y-3 text-white!">
          <input
            type="email"
            placeholder="ایمیل شما"
            className="w-full px-3 py-2 rounded-lg text-white! text-sm focus:outline-none ring-1 focus:ring-2 focus:ring-white"
          />
          <button className="w-full cursor-pointer bg-white text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            عضویت در خبرنامه
          </button>
        </div>
      </div>
    </>
  )
}

export default NewsBlogForm

