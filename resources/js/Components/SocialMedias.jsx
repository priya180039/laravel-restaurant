import React from "react";
import {
    BiLogoLinkedinSquare,
    BiLogoGmail,
    BiLogoGithub,
    BiGlobe,
} from "react-icons/bi";

const SocialMedias = () => {
    const images = {
        Linkedin: {
            icon: <BiLogoLinkedinSquare className="text-5xl mx-auto" />,
            name: "Linkedin",
            url: "https://www.linkedin.com/in/priya-bagus-amanullah-2a7256250/",
        },
        Email: {
            icon: <BiLogoGmail className="text-5xl mx-auto" />,
            name: "Email",
            url: "mailto: priyabagus@gmail.com",
        },
        Github: {
            icon: <BiLogoGithub className="text-5xl mx-auto" />,
            name: "Github",
            url: "https://github.com/priya180039",
        },
        Portfolio: {
            icon: <BiGlobe className="text-5xl mx-auto" />,
            name: "Portfolio",
            url: "https://cleauve-portofolio.vercel.app/",
        },
    };

    const renderIcons = (name) => {
        switch (name) {
            case "Linkedin":
                return images.Linkedin.icon;
            case "Email":
                return images.Email.icon;
            case "Github":
                return images.Github.icon;
            case "Portfolio":
                return images.Portfolio.icon;
        }
    };

    return (
        <div className="grid grid-cols-4 mx-auto gap-6">
            {Object.values(images).map((social, i) => {
                return (
                    <a
                        href={social.url}
                        target="_blank"
                        key={i}
                        className="hover:cursor-pointer hover:text-gray-50 transform transition-all duration-200 ease-in-out"
                    >
                        {renderIcons(social.name)}
                        <p className="text-xl text-center pt-2">
                            {social.name}
                        </p>
                    </a>
                );
            })}
        </div>
    );
};

export default SocialMedias;
