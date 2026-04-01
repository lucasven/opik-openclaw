import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";
import { disableLogger } from "opik";
import { registerOpikCli } from "./src/configure.js";
import { createOpikService } from "./src/service.js";
import { parseOpikPluginConfig } from "./src/types.js";
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import type { OpenClawPluginConfigSchema } from "openclaw/plugin-sdk/plugin-entry";

disableLogger();

export default definePluginEntry({
  id: "opik-openclaw",
  name: "Opik",
  description: "Export LLM traces and spans to Opik for observability",
  configSchema: emptyPluginConfigSchema() as OpenClawPluginConfigSchema,
  register(api: Parameters<typeof definePluginEntry>[0]["register"] extends (api: infer A) => void ? A : never) {
    const typedApi = api as OpenClawPluginApi;
    const pluginConfig = parseOpikPluginConfig(typedApi.pluginConfig);
    typedApi.registerService(createOpikService(typedApi, pluginConfig));
    typedApi.registerCli(
      ({ program }) =>
        registerOpikCli({
          program,
          loadConfig: typedApi.runtime.config.loadConfig,
          writeConfigFile: typedApi.runtime.config.writeConfigFile,
        }),
      { commands: ["opik"] },
    );
  },
});
