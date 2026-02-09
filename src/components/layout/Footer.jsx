import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function VibeFooter() {
  const { userToken } = useContext(UserContext);

  return (
    <Footer>
      <div className="container mx-auto flex w-full items-center justify-between p-4 sm:p-6 lg:p-8">
        <FooterCopyright as={Link} to="/" by="VibeFlow™" year={2025} />

        <FooterLinkGroup>
          {userToken && (
            <>
              <FooterLink as={Link} to="/">
                Home
              </FooterLink>
              <FooterLink as={Link} to="/posts">
                Posts
              </FooterLink>
            </>
          )}
        </FooterLinkGroup>
      </div>
    </Footer>
  );
}
