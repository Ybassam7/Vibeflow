import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { Link } from "react-router-dom";

export default function VibeFooter() {
  return (
    <Footer>
      <div className="container mx-auto flex w-full items-center justify-between p-4 sm:p-6 lg:p-8">
        <FooterCopyright as={Link} to="/" by="VibeFlow™" year={2025} />
        <FooterLinkGroup>
          <FooterLink as={Link} to="/">
            Home
          </FooterLink>
          <FooterLink as={Link} to="/posts">
            Posts
          </FooterLink>
        </FooterLinkGroup>
      </div>
    </Footer>
  );
}
