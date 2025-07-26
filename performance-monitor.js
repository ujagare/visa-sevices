// Performance Monitor
// This script monitors and reports website performance metrics
// It uses the Performance API and Web Vitals to collect metrics

// Load Web Vitals library
(function() {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/web-vitals';
  script.async = true;
  document.head.appendChild(script);
})();

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', function() {
  // Wait for Web Vitals to load
  setTimeout(() => {
    if (typeof webVitals !== 'undefined') {
      initPerformanceMonitoring();
    } else {
      console.warn('Web Vitals library not loaded. Performance monitoring disabled.');
    }
  }, 1000);
});

// Initialize performance monitoring
function initPerformanceMonitoring() {
  // Collect Web Vitals metrics
  webVitals.getCLS(handleMetric);
  webVitals.getFID(handleMetric);
  webVitals.getLCP(handleMetric);
  webVitals.getFCP(handleMetric);
  webVitals.getTTFB(handleMetric);
  
  // Collect Navigation Timing metrics
  collectNavigationTiming();
  
  // Collect Resource Timing metrics
  collectResourceTiming();
  
  // Log performance metrics to console
  console.log('Performance monitoring initialized');
}

// Handle Web Vitals metrics
function handleMetric(metric) {
  // Log the metric to console
  console.log(`${metric.name}: ${metric.value}`);
  
  // Store the metric in localStorage
  const metrics = JSON.parse(localStorage.getItem('performanceMetrics') || '{}');
  metrics[metric.name] = metric.value;
  localStorage.setItem('performanceMetrics', JSON.stringify(metrics));
  
  // Send the metric to the server (if needed)
  // sendMetricToServer(metric);
}

// Collect Navigation Timing metrics
function collectNavigationTiming() {
  // Wait for the page to fully load
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Get Navigation Timing API data
      const perfData = window.performance.timing;
      
      // Calculate timing metrics
      const metrics = {
        // Page load time (from navigation start to load event)
        pageLoadTime: perfData.loadEventEnd - perfData.navigationStart,
        
        // DOM content loaded time
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        
        // Time to first byte
        timeToFirstByte: perfData.responseStart - perfData.navigationStart,
        
        // DNS lookup time
        dnsLookup: perfData.domainLookupEnd - perfData.domainLookupStart,
        
        // TCP connection time
        tcpConnection: perfData.connectEnd - perfData.connectStart,
        
        // Server response time
        serverResponse: perfData.responseEnd - perfData.requestStart,
        
        // DOM processing time
        domProcessing: perfData.domComplete - perfData.domLoading
      };
      
      // Log the metrics to console
      console.log('Navigation Timing Metrics:', metrics);
      
      // Store the metrics in localStorage
      const storedMetrics = JSON.parse(localStorage.getItem('performanceMetrics') || '{}');
      Object.assign(storedMetrics, metrics);
      localStorage.setItem('performanceMetrics', JSON.stringify(storedMetrics));
    }, 0);
  });
}

// Collect Resource Timing metrics
function collectResourceTiming() {
  // Wait for the page to fully load
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Get Resource Timing API data
      const resources = window.performance.getEntriesByType('resource');
      
      // Group resources by type
      const resourcesByType = {
        script: [],
        css: [],
        image: [],
        font: [],
        other: []
      };
      
      // Calculate total resource size and load time
      let totalSize = 0;
      let totalLoadTime = 0;
      
      // Process each resource
      resources.forEach(resource => {
        // Get resource type
        const type = resource.initiatorType;
        
        // Get resource size (if available)
        const size = resource.transferSize || 0;
        
        // Get resource load time
        const loadTime = resource.responseEnd - resource.startTime;
        
        // Add to total
        totalSize += size;
        totalLoadTime += loadTime;
        
        // Add to resource type group
        if (resourcesByType[type]) {
          resourcesByType[type].push({
            name: resource.name,
            size: size,
            loadTime: loadTime
          });
        } else {
          resourcesByType.other.push({
            name: resource.name,
            size: size,
            loadTime: loadTime
          });
        }
      });
      
      // Calculate average load time
      const averageLoadTime = totalLoadTime / resources.length;
      
      // Log the metrics to console
      console.log('Resource Timing Metrics:', {
        totalResources: resources.length,
        totalSize: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
        totalLoadTime: `${(totalLoadTime / 1000).toFixed(2)} seconds`,
        averageLoadTime: `${(averageLoadTime).toFixed(2)} ms`,
        resourcesByType: resourcesByType
      });
      
      // Store summary metrics in localStorage
      const storedMetrics = JSON.parse(localStorage.getItem('performanceMetrics') || '{}');
      Object.assign(storedMetrics, {
        totalResources: resources.length,
        totalResourceSize: totalSize,
        totalResourceLoadTime: totalLoadTime,
        averageResourceLoadTime: averageLoadTime
      });
      localStorage.setItem('performanceMetrics', JSON.stringify(storedMetrics));
    }, 0);
  });
}

// Function to send metrics to server (if needed)
function sendMetricToServer(metric) {
  // This function can be implemented to send metrics to a server
  // for analytics and monitoring purposes
  
  // Example implementation:
  /*
  fetch('/api/performance-metrics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metric)
  });
  */
}

// Add a simple UI to view performance metrics
window.addEventListener('load', () => {
  setTimeout(() => {
    // Create a button to view performance metrics
    const button = document.createElement('button');
    button.textContent = 'View Performance Metrics';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.background = '#3b82f6';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    
    // Add click event listener
    button.addEventListener('click', () => {
      // Get stored metrics
      const metrics = JSON.parse(localStorage.getItem('performanceMetrics') || '{}');
      
      // Create a modal to display metrics
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.background = 'rgba(0, 0, 0, 0.8)';
      modal.style.zIndex = '10000';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      
      // Create modal content
      const content = document.createElement('div');
      content.style.background = 'white';
      content.style.padding = '20px';
      content.style.borderRadius = '10px';
      content.style.maxWidth = '80%';
      content.style.maxHeight = '80%';
      content.style.overflow = 'auto';
      
      // Create modal header
      const header = document.createElement('h2');
      header.textContent = 'Performance Metrics';
      header.style.marginTop = '0';
      
      // Create close button
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.style.padding = '10px';
      closeButton.style.background = '#3b82f6';
      closeButton.style.color = 'white';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '5px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.marginTop = '20px';
      
      // Add click event listener to close button
      closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      // Create metrics content
      const metricsContent = document.createElement('div');
      
      // Add metrics to content
      for (const [key, value] of Object.entries(metrics)) {
        const metricRow = document.createElement('div');
        metricRow.style.marginBottom = '10px';
        
        const metricName = document.createElement('strong');
        metricName.textContent = key + ': ';
        
        const metricValue = document.createElement('span');
        
        // Format the value based on the metric
        if (typeof value === 'number') {
          if (key.includes('Time') || key.includes('LCP') || key.includes('FCP') || key.includes('TTFB')) {
            metricValue.textContent = `${value.toFixed(2)} ms`;
          } else if (key.includes('Size')) {
            metricValue.textContent = `${(value / 1024 / 1024).toFixed(2)} MB`;
          } else {
            metricValue.textContent = value.toString();
          }
        } else {
          metricValue.textContent = JSON.stringify(value);
        }
        
        metricRow.appendChild(metricName);
        metricRow.appendChild(metricValue);
        metricsContent.appendChild(metricRow);
      }
      
      // Add elements to modal
      content.appendChild(header);
      content.appendChild(metricsContent);
      content.appendChild(closeButton);
      modal.appendChild(content);
      
      // Add modal to body
      document.body.appendChild(modal);
    });
    
    // Add button to body
    document.body.appendChild(button);
  }, 2000);
});