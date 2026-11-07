#!/bin/bash
# 🔐 WSL2 Pentest Installer + Menu Setup (Child-friendly, fully working)

set -e

echo "=== Fixing Kali repository key ==="
sudo apt-key adv --keyserver hkp://keys.gnupg.net:80 --recv-keys 827C8569F2518CC677FECA1AED65462EC8D5E4C5 || true
sudo apt update

echo "=== Installing common pentesting tools ==="
sudo apt install -y metasploit-framework nmap hydra john nikto gobuster sqlmap aircrack-ng netcat-openbsd recon-ng exploitdb \
    wireshark burpsuite gvm wget curl git unzip nano python3 python3-pip

echo "=== Installing VSCode (GUI) ==="
if ! command -v code &>/dev/null; then
    sudo apt install -y software-properties-common apt-transport-https wget
    wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
    sudo apt update
    sudo apt install -y code
fi

echo "=== Installing recommended VSCode extensions ==="
code --install-extension ms-python.python
code --install-extension eamodio.gitlens
code --install-extension ms-vscode.cpptools

echo "=== Installing Social-Engineer Toolkit (SET) ==="
cd ~
if [ ! -d "social-engineer-toolkit" ]; then
    git clone https://github.com/trustedsec/social-engineer-toolkit.git
fi
cd social-engineer-toolkit
sudo python3 setup.py install

echo "=== Setting up pentest menu command ==="
mkdir -p ~/pentest-menu
cp pentest-menu.sh ~/pentest-menu/pentest-menu.sh
chmod +x ~/pentest-menu/pentest-menu.sh

# Add shortcut to /usr/local/bin if not exists
if [ ! -f /usr/local/bin/pentest-menu ]; then
    sudo ln -s ~/pentest-menu/pentest-menu.sh /usr/local/bin/pentest-menu
fi

echo "=== Downloading Kioptrix Labs VMs ==="
mkdir -p ~/KioptrixLabs && cd ~/KioptrixLabs
wget -c http://www.kioptrix.com/files/Kioptrix-1.1.x86.vmdk
wget -c http://www.kioptrix.com/files/Kioptrix-2.1.x86.vmdk
echo "Download complete. Import these VMs into VirtualBox."

echo "=== Installation complete! ==="
echo "Run 'pentest-menu' to launch the pentesting menu."
