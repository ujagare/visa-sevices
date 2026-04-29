# White Wings Visa - Image Download and WebP Conversion Script
# This script downloads all external images and converts them to WebP format

Write-Host "🚀 White Wings Visa - Image Optimization Script" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Create images directory structure
$baseDir = "images"
$countriesDir = "$baseDir/countries"
$workDir = "$countriesDir/work"
$visitDir = "$countriesDir/visit"
$studyDir = "$countriesDir/study"

# Create directories if they don't exist
@($baseDir, $countriesDir, $workDir, $visitDir, $studyDir) | ForEach-Object {
    if (!(Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force
        Write-Host "📁 Created directory: $_" -ForegroundColor Green
    }
}

# Image URLs and their local names
$images = @(
    # Work Page Images
    @{
        url = "https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        name = "canada-work"
        dir = $workDir
        description = "Canada Work Opportunities"
    },
    @{
        url = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        name = "australia-work"
        dir = $workDir
        description = "Australia Work Opportunities"
    },
    @{
        url = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        name = "newzealand-work"
        dir = $workDir
        description = "New Zealand Work Opportunities"
    },
    @{
        url = "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        name = "dubai-work"
        dir = $workDir
        description = "Dubai Work Opportunities"
    },
    @{
        url = "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        name = "europe-work"
        dir = $workDir
        description = "Europe Work Opportunities"
    },
    @{
        url = "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        name = "singapore-work"
        dir = $workDir
        description = "Singapore Work Opportunities"
    },
    
    # Visit Page Images
    @{
        url = "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        name = "usa-visit"
        dir = $visitDir
        description = "USA Visit Tourism"
    },
    @{
        url = "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        name = "australia-visit"
        dir = $visitDir
        description = "Australia Visit Tourism"
    },
    @{
        url = "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        name = "europe-visit"
        dir = $visitDir
        description = "Europe Visit Tourism"
    },
    
    # Study Page Images
    @{
        url = "https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        name = "canada-study"
        dir = $studyDir
        description = "Canada Study Abroad"
    },
    @{
        url = "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        name = "usa-study"
        dir = $studyDir
        description = "USA Study Abroad"
    },
    @{
        url = "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        name = "europe-study"
        dir = $studyDir
        description = "Europe Study Abroad"
    }
)

Write-Host "`n📥 Starting image download and conversion..." -ForegroundColor Yellow
Write-Host "Total images to process: $($images.Count)" -ForegroundColor Yellow

$successCount = 0
$errorCount = 0

foreach ($image in $images) {
    try {
        Write-Host "`n🔄 Processing: $($image.description)" -ForegroundColor Cyan
        
        # Download original image
        $originalPath = "$($image.dir)/$($image.name).jpg"
        $webpPath = "$($image.dir)/$($image.name).webp"
        
        Write-Host "   📥 Downloading from Unsplash..." -ForegroundColor Gray
        Invoke-WebRequest -Uri $image.url -OutFile $originalPath -UseBasicParsing
        
        Write-Host "   ✅ Downloaded: $originalPath" -ForegroundColor Green
        Write-Host "   🔄 Converting to WebP..." -ForegroundColor Gray
        
        # Note: WebP conversion requires additional tools
        # For now, we'll keep the JPG files and provide conversion instructions
        Write-Host "   ⚠️  WebP conversion requires additional tools (see instructions below)" -ForegroundColor Yellow
        
        $successCount++
        
    } catch {
        Write-Host "   ❌ Error processing $($image.description): $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "`n=================================================" -ForegroundColor Cyan
Write-Host "📊 DOWNLOAD SUMMARY:" -ForegroundColor Cyan
Write-Host "✅ Successfully downloaded: $successCount images" -ForegroundColor Green
Write-Host "❌ Errors: $errorCount images" -ForegroundColor Red

Write-Host "`n🛠️  WEBP CONVERSION INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Yellow
Write-Host "1. Install ImageMagick: https://imagemagick.org/script/download.php#windows" -ForegroundColor White
Write-Host "2. Or use online converter: https://convertio.co/jpg-webp/" -ForegroundColor White
Write-Host "3. Or use this PowerShell command (if ImageMagick installed):" -ForegroundColor White
Write-Host "   Get-ChildItem -Path 'images/countries' -Filter '*.jpg' -Recurse | ForEach-Object { magick `$_.FullName `$($_.FullName -replace '.jpg', '.webp') }" -ForegroundColor Cyan

Write-Host "`n🎯 NEXT STEPS:" -ForegroundColor Green
Write-Host "1. Convert all JPG files to WebP format" -ForegroundColor White
Write-Host "2. Update HTML files to use local WebP images" -ForegroundColor White
Write-Host "3. Test website performance improvement" -ForegroundColor White

Write-Host "`n🚀 Script completed!" -ForegroundColor Green
