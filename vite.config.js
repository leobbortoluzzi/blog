import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const pages = {"estados":{"outputDir":"./estados","lang":"en","title":"","cacheVersion":10,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/estados/"},{"rel":"alternate","hreflang":"en","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/estados/"}]},"whatsapp":{"outputDir":"./whatsapp","lang":"en","title":"","cacheVersion":10,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/whatsapp/"},{"rel":"alternate","hreflang":"en","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/whatsapp/"}]},"estados/:param":{"outputDir":"./estados/:param","lang":"en","title":"","cacheVersion":10,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/estados/:param/"},{"rel":"alternate","hreflang":"en","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/estados/:param/"}]},"index":{"outputDir":"./","lang":"en","title":"","cacheVersion":10,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/"},{"rel":"alternate","hreflang":"en","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/"}]},"__99ce74c8-7dd6-403c-8e4c-285280d90f83__path__":{"outputDir":"./__99ce74c8-7dd6-403c-8e4c-285280d90f83__path__","lang":"en","title":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__title__","cacheVersion":10,"meta":[{"name":"title","content":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__title__"},{"name":"description","content":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__desc__"},{"name":"keywords","content":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__keywords__"},{"name":"image","content":"/__99ce74c8-7dd6-403c-8e4c-285280d90f83__image__"},{"itemprop":"name","content":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__title__"},{"itemprop":"description","content":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__desc__"},{"itemprop":"image","content":"/__99ce74c8-7dd6-403c-8e4c-285280d90f83__image__"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__socialTitle__"},{"name":"twitter:description","content":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__socialDesc__"},{"name":"twitter:image","content":"/__99ce74c8-7dd6-403c-8e4c-285280d90f83__image__"},{"property":"og:title","content":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__socialTitle__"},{"property":"og:description","content":"__99ce74c8-7dd6-403c-8e4c-285280d90f83__socialDesc__"},{"property":"og:image","content":"/__99ce74c8-7dd6-403c-8e4c-285280d90f83__image__"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/__99ce74c8-7dd6-403c-8e4c-285280d90f83__path__/"},{"rel":"alternate","hreflang":"en","href":"https://a3db8d63-1f53-4982-82cd-aa5e9a3f2f87.weweb-preview.io/__99ce74c8-7dd6-403c-8e4c-285280d90f83__path__/"}]}};

// Read the main HTML template
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8');
const compiledTemplate = handlebars.compile(template);

// Generate an HTML file for each page with its metadata
Object.values(pages).forEach(pageConfig => {
    // Compile the template with page metadata
    const html = compiledTemplate({
        title: pageConfig.title,
        lang: pageConfig.lang,
        meta: pageConfig.meta,
        scripts: {
            head: pageConfig.scripts.head,
            body: pageConfig.scripts.body,
        },
        alternateLinks: pageConfig.alternateLinks,
        cacheVersion: pageConfig.cacheVersion,
        baseTag: pageConfig.baseTag,
    });

    // Save output html for each page
    if (!fs.existsSync(pageConfig.outputDir)) {
        fs.mkdirSync(pageConfig.outputDir, { recursive: true });
    }
    fs.writeFileSync(`${pageConfig.outputDir}/index.html`, html);
});

const rollupOptionsInput = {};
for (const pageName in pages) {
    rollupOptionsInput[pageName] = path.resolve(__dirname, pages[pageName].outputDir, 'index.html');
}

export default defineConfig(() => {
    return {
        plugins: [nodePolyfills({ include: ['events', 'stream', 'string_decoder'] }), vue()],
        base: "/",
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
            postcss: {
                plugins: [autoprefixer],
            },
        },
        build: {
            chunkSizeWarningLimit: 10000,
            rollupOptions: {
                input: rollupOptionsInput,
                onwarn: (entry, next) => {
                    if (entry.loc?.file && /js$/.test(entry.loc.file) && /Use of eval in/.test(entry.message)) return;
                    return next(entry);
                },
                maxParallelFileOps: 900,
            },
        },
        logLevel: 'warn',
    };
});
