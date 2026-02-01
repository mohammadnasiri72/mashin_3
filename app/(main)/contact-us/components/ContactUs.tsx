import ContactUsForm from "./ContactUsForm";
import SideBarContact from "./SideBarContact";

function ContactUs({
  banner,
  setting,
}: {
  banner: Items[];
  setting: SettingType[];
}) {
  const tel: string | undefined = setting.find(
    (e) => e.propertyKey === "site_tel",
  )?.propertyValue;
  const mobile: string | undefined = setting.find(
    (e) => e.propertyKey === "site_tel1",
  )?.propertyValue;
  const address: string | undefined = setting.find(
    (e) => e.propertyKey === "site_address1",
  )?.propertyValue;
  const map: string | undefined = setting.find(
    (e) => e.propertyKey === "site_map_script",
  )?.propertyValue;

  return (
    <>
      <div className="bg-gray-50 flex flex-wrap min-h-screen">
        <div className="lg:w-3/4 w-full p-2">
          <ContactUsForm tel={tel} mobile={mobile} address={address} map={map}/>
        </div>
        <div className="lg:w-1/4 w-full">
          <SideBarContact banner={banner} />
        </div>
      </div>
    </>
  );
}

export default ContactUs;
