from PIL import Image, ImageDraw

# Create assets directory
import os
os.makedirs('D:/Coding/TOGOMO/assets', exist_ok=True)

# Create icon (1024x1024)
icon = Image.new('RGB', (1024, 1024), color=(255, 149, 0))  # Orange
icon.save('D:/Coding/TOGOMO/assets/icon.png')
print('✓ Created icon.png')

# Create splash (2208x2208)
splash = Image.new('RGB', (2208, 2208), color=(255, 249, 240))  # Light bg
splash.save('D:/Coding/TOGOMO/assets/splash.png')
print('✓ Created splash.png')

# Create adaptive icon (1080x1080)
adaptive = Image.new('RGB', (1080, 1080), color=(255, 149, 0))  # Orange
adaptive.save('D:/Coding/TOGOMO/assets/adaptive-icon.png')
print('✓ Created adaptive-icon.png')

print('All images created!')
