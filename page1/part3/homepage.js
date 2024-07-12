window.onload = () => {
    const topButton = document.getElementById('top');

    // 監聽點擊事件
    topButton.addEventListener('click', () => {
        // 使用 requestAnimationFrame 來實現平滑捲動效果
        const scrollToTop = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > 0) {
                // 每次移動距離設定為當前滾動距離的一部分，例如 1/6
                window.scrollTo(0, scrollTop - scrollTop / 6);
                requestAnimationFrame(scrollToTop);
            }
        };

        scrollToTop();
    });
};
