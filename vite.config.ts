import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression';
import htmlMinimize from '@sergeymakinen/vite-plugin-html-minimize'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		// 监听所有地址（包括局域网与公网），方便内网调试
		host: '0.0.0.0',
	},
	base: './',
	// https://cn.vitejs.dev/guide/build#advanced-base-options
	experimental: {
		renderBuiltUrl(filename, { type }) {
			// frontend-antd/public
			if (type === 'public') return '../' + filename
			// assets
			return filename
		},
	},
	plugins: [
		viteCompression({ algorithm: "brotliCompress" }),
		viteCompression({ algorithm: "gzip" }),
		htmlMinimize({
			minifierOptions: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				html5: true,
				keepClosingSlash: false,
				minifyCSS: true,
				minifyJS: false,
				removeAttributeQuotes: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeOptionalTags: true,
				includeAutoGeneratedTags: false,
			}
		}),
	],
	build: {
		copyPublicDir: false,
		target: 'esnext',
		reportCompressedSize: false, // 是否使用vite自带的方式打印压缩后的大小
		modulePreload: {
			polyfill: false,
		},
		chunkSizeWarningLimit: Infinity,
		cssCodeSplit: true,
		assetsInlineLimit: 0,
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern',
			},
		},
	},
})
