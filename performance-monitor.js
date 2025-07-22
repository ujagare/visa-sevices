// Performance Monitoring and Optimization Script
(function() {
    'use strict';

    // Performance metrics tracking
    const performanceMetrics = {
        startTime: performance.now(),
        loadTime: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0
    };

    // Monitor Core Web Vitals
    function monitorWebVitals() {
        // First Contentful Paint
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    performanceMetrics.firstContentfulPaint = entry.startTime;
                    console.log(`FCP: ${entry.startTime.toFixed(2)}ms`);
                }
            }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            performanceMetrics.largestContentfulPaint = lastEntry.startTime;
            console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            performanceMetrics.cumulativeLayoutShift = clsValue;
            console.log(`CLS: ${clsValue.toFixed(4)}`);
        }).observe({ entryTypes: ['layout-shift'] });

        // First Input Delay
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                performanceMetrics.firstInputDelay = entry.processingStart - entry.startTime;
                console.log(`FID: ${performanceMetrics.firstInputDelay.toFixed(2)}ms`);
            }
        }).observe({ entryTypes: ['first-input'] });
    }

    // Image lazy loading optimization
    function optimizeImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Add fade-in effect
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease';
                        
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Resource hints for better loading
    function addResourceHints() {
        const head = document.head;
        
        // Preconnect to external domains
        const preconnectDomains = [
            'https://fonts.cdnfonts.com',
            'https://cdnjs.cloudflare.com',
            'https://unpkg.com',
            'https://cdn.jsdelivr.net',
            'https://flagcdn.com'
        ];
        
        preconnectDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            head.appendChild(link);
        });

        // DNS prefetch for form submission
        const dnsPrefetch = document.createElement('link');
        dnsPrefetch.rel = 'dns-prefetch';
        dnsPrefetch.href = 'https://formsubmit.co';
        head.appendChild(dnsPrefetch);
    }

    // Optimize third-party scripts
    function optimizeThirdPartyScripts() {
        // Defer non-critical scripts
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
                // Add defer to non-critical scripts
                if (!script.src.includes('loader.js')) {
                    script.defer = true;
                }
            }
        });
    }

    // Memory usage monitoring
    function monitorMemoryUsage() {
        if ('memory' in performance) {
            const memory = performance.memory;
            console.log(`Memory Usage:
                Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB
                Total: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB
                Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);
        }
    }

    // Network information monitoring
    function monitorNetworkInfo() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            console.log(`Network Info:
                Type: ${connection.effectiveType}
                Downlink: ${connection.downlink} Mbps
                RTT: ${connection.rtt}ms`);
            
            // Adjust loading strategy based on connection
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Reduce image quality for slow connections
                document.documentElement.classList.add('slow-connection');
            }
        }
    }

    // Performance budget monitoring
    function checkPerformanceBudget() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - performanceMetrics.startTime;
            performanceMetrics.loadTime = loadTime;
            
            // Performance budget thresholds
            const budgets = {
                loadTime: 3000, // 3 seconds
                fcp: 1800, // 1.8 seconds
                lcp: 2500, // 2.5 seconds
                cls: 0.1, // 0.1
                fid: 100 // 100ms
            };
            
            // Check against budgets
            const results = {
                loadTime: loadTime <= budgets.loadTime,
                fcp: performanceMetrics.firstContentfulPaint <= budgets.fcp,
                lcp: performanceMetrics.largestContentfulPaint <= budgets.lcp,
                cls: performanceMetrics.cumulativeLayoutShift <= budgets.cls,
                fid: performanceMetrics.firstInputDelay <= budgets.fid
            };
            
            console.log('Performance Budget Results:', results);
            
            // Send analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'performance_metrics', {
                    load_time: Math.round(loadTime),
                    fcp: Math.round(performanceMetrics.firstContentfulPaint),
                    lcp: Math.round(performanceMetrics.largestContentfulPaint),
                    cls: performanceMetrics.cumulativeLayoutShift,
                    fid: Math.round(performanceMetrics.firstInputDelay)
                });
            }
        });
    }

    // Initialize all optimizations
    function init() {
        // Run immediately
        addResourceHints();
        optimizeThirdPartyScripts();
        
        // Run when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                optimizeImages();
                monitorWebVitals();
                monitorNetworkInfo();
            });
        } else {
            optimizeImages();
            monitorWebVitals();
            monitorNetworkInfo();
        }
        
        // Run when page is fully loaded
        window.addEventListener('load', () => {
            checkPerformanceBudget();
            monitorMemoryUsage();
            
            // Clean up after 30 seconds
            setTimeout(() => {
                console.log('Final Performance Metrics:', performanceMetrics);
            }, 30000);
        });
    }

    // Start optimization
    init();

})();
