module.exports = {
  devServer: {
    proxy: {
      '/toplist': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/recommend': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/search': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/taogelist': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/topmusiclist': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/musicdetail': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
};
