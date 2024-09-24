import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import config from "./src/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: config.BACKEND_API
					? config.BACKEND_API
					: "http://localhost:7100",
			},
		},
	},
});
