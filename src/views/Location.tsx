import Container from "@/components/Container";

const Location = () => {
  return (
    <Container className="min-h-screen">
      <div className="mx-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.08451034053456!2d120.91763876686716!3d13.877878802438001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0b003b0ff2c9%3A0x6f813e24850eed57!2sHardin%20Caf%C3%A9!5e0!3m2!1sen!2sph!4v1710055487885!5m2!1sen!2sph"
          width="600"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </Container>
  );
};

export default Location;
