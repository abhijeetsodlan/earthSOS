declare module "react-simple-maps" {
  import type { ComponentType, ReactNode, SVGProps } from "react";

  export interface GeographyObject {
    rsmKey: string;
    id?: string;
    properties: {
      name?: string;
    };
  }

  export interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    children: ReactNode;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
    };
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: GeographyObject[] }) => ReactNode;
  }

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: GeographyObject;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
}
