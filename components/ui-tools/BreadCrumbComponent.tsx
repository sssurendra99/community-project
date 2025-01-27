"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const BreadCrumbComponent = () => {
  const pathname = usePathname();
  const pathnames = pathname
    .split("/")
    .filter((path) => path)
    .slice(0, -1);
  const currentPath: string = pathname
    .split("/")
    .filter((path) => path)
    .slice(-1)
    .toString();
  const currentItem: string =
    currentPath[0].toUpperCase() + currentPath.slice(1);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathnames.map((link, index) => {
            let path = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={path}>
                    {pathnames[index]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          })}
          <BreadcrumbItem>
            <BreadcrumbPage>{currentItem}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbComponent;
