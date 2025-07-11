#!/usr/bin/env python3
"""
Universal Mobile Menu Applier
Applies the same mobile menu to all HTML pages
"""

import os
import re
from pathlib import Path

# List of HTML files to update
HTML_FILES = [
    'index.html',
    'about.html', 
    'contact.html',
    'study.html',
    'migrate.html',
    'work.html',
    'visit.html',
    'thank-you.html'
]

# Universal mobile menu HTML
MOBILE_MENU_HTML = '''                    <!-- Universal Mobile Menu Button -->
                    <div class="mobile-menu-btn">
                        <i class="ri-menu-line" id="menu-toggle"></i>
                    </div>

                    <!-- Universal Mobile Menu -->
                    <div class="mobile-menu" id="mobile-menu">
                        <div class="mobile-menu-content">
                            <div class="mobile-menu-header">
                                <img src="images/logo/WING LOGO.png" class="mobile-logo" alt="White Wings Logo">
                                <i class="ri-close-line" id="menu-close" title="Close Menu"></i>
                            </div>
                            <ul class="mobile-nav-links">
                                <li><a href="index.html"><i class="ri-home-4-line"></i> Home</a></li>
                                <li class="mobile-services-item">
                                    <div class="mobile-services-toggle">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <i class="ri-service-line"></i>
                                            <span>Services</span>
                                        </div>
                                        <i class="ri-arrow-down-s-line dropdown-arrow"></i>
                                    </div>
                                    <div class="mobile-services-dropdown">
                                        <a href="study.html">
                                            <i class="ri-graduation-cap-line"></i>
                                            <span>Study Abroad</span>
                                        </a>
                                        <a href="migrate.html">
                                            <i class="ri-home-heart-line"></i>
                                            <span>Migrate</span>
                                        </a>
                                        <a href="work.html">
                                            <i class="ri-briefcase-line"></i>
                                            <span>Work Abroad</span>
                                        </a>
                                        <a href="visit.html">
                                            <i class="ri-plane-line"></i>
                                            <span>Visit</span>
                                        </a>
                                    </div>
                                </li>
                                <li><a href="about.html"><i class="ri-information-line"></i> About</a></li>
                                <li><a href="contact.html"><i class="ri-phone-line"></i> Contact</a></li>
                            </ul>
                            <button class="mobile-apply-btn">
                                <a href="contact.html"><i class="ri-send-plane-line"></i> Apply Now</a>
                            </button>
                        </div>
                    </div>'''

def update_html_file(filename):
    """Update a single HTML file with universal mobile menu"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"Updating {filename}...")
        
        # Remove any existing mobile menu content
        # Pattern to match mobile menu button and menu
        mobile_menu_pattern = r'<!-- .*?Mobile Menu.*?-->(.*?)(?=</nav>|</nav-div>)'
        content = re.sub(mobile_menu_pattern, MOBILE_MENU_HTML, content, flags=re.DOTALL | re.IGNORECASE)
        
        # Ensure CSS is included
        if 'simple-mobile-navbar.css' not in content:
            css_pattern = r'(<link rel="stylesheet" href="[^"]*\.css">)'
            css_replacement = r'\1\n    <link rel="stylesheet" href="simple-mobile-navbar.css">'
            content = re.sub(css_pattern, css_replacement, content, count=1)
        
        # Ensure JS is included
        if 'universal-mobile-menu.js' not in content:
            js_pattern = r'(<script src="[^"]*\.js"></script>)'
            js_replacement = r'<script src="universal-mobile-menu.js"></script>\n    \1'
            content = re.sub(js_pattern, js_replacement, content, count=1)
        
        # Set active states based on filename
        page_name = Path(filename).stem
        if page_name == 'about':
            content = content.replace(
                '<a href="about.html"><i class="ri-information-line"></i> About</a>',
                '<a href="about.html" class="active"><i class="ri-information-line"></i> About</a>'
            )
        elif page_name == 'contact':
            content = content.replace(
                '<a href="contact.html"><i class="ri-phone-line"></i> Contact</a>',
                '<a href="contact.html" class="active"><i class="ri-phone-line"></i> Contact</a>'
            )
        elif page_name == 'study':
            content = content.replace(
                '<a href="study.html">',
                '<a href="study.html" class="active">'
            )
        elif page_name == 'migrate':
            content = content.replace(
                '<a href="migrate.html">',
                '<a href="migrate.html" class="active">'
            )
        elif page_name == 'work':
            content = content.replace(
                '<a href="work.html">',
                '<a href="work.html" class="active">'
            )
        elif page_name == 'visit':
            content = content.replace(
                '<a href="visit.html">',
                '<a href="visit.html" class="active">'
            )
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Successfully updated {filename}")
        
    except Exception as e:
        print(f"❌ Error updating {filename}: {e}")

def main():
    """Main function to update all HTML files"""
    print("🚀 Starting universal mobile menu application...\n")
    
    for filename in HTML_FILES:
        if os.path.exists(filename):
            update_html_file(filename)
        else:
            print(f"⚠️  File {filename} not found, skipping...")
    
    print("\n✅ Universal mobile menu application completed!")
    print("📱 All pages now have the same mobile menu with working services dropdown")

if __name__ == "__main__":
    main()
