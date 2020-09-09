from folder_builder.folder_builder import Folder

# Creating folders
assets_folder = Folder('assets')
css_folder = Folder('css')
scss_folder = Folder('scss')
js_folder = Folder('js')
img_folder = Folder('img')

# Putting subfolders to assets folder
assets_folder.add(css_folder)
assets_folder.add(scss_folder)
assets_folder.add(js_folder)
assets_folder.add(img_folder)

# Build folders
assets_folder.build()