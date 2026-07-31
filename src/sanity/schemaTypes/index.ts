import { about } from "./about";
import { localizedString, localizedText } from "./localizedString";
import { project } from "./project";
import { service } from "./service";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  localizedString,
  localizedText,
  project,
  service,
  siteSettings,
  about,
];
