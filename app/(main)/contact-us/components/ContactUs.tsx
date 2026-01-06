

import ContactUsForm from "./ContactUsForm";
import SideBarContact from "./SideBarContact";

function ContactUs({banner}:{banner:Items[]}) {
  return (
    <>
      <div className="bg-gray-50 flex flex-wrap min-h-screen">
        <div className="lg:w-3/4 w-full p-2">
          <ContactUsForm />
        </div>
        <div className="lg:w-1/4 w-full">
          <SideBarContact banner={banner}/>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
