import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|ar|ku)/:path*"],
};

// In this file, you can extend the routing configuration with your custom logic.