# 请在项目根目录运行 npm run theme
# 按照自己需求，可以组装出多种theme，类似dark-compact.less
lessc --js ./script/theme/dark-compact.less ./public/theme/antd.dark-compact.min.css --clean-css="advanced"