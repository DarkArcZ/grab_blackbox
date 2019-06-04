Headless Set up for Raspberry Pi to communicate via SSH

Software Required:
1. BalenaEtcher
2. puTTY

Steps
1. Flash SD Card with Raspbian IMG using BalenaEtcher
3. Create file titled "ssh" in /boot. The file should just be a space
4. Create file wpa_supplicant.conf. 
<!-- 
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
country=SG
update_config=1

network={
    ssid="Home Wifi"
    psk="mypassword"
    key_mgmt=WPA-PSK
} 
--> 
5. Check that your Pi has connected to the network via command prompt. Type "ipconfig" in cmd prompt and check for the iPv4 address.
6. Put the ipV4 address in puTTY and make sure that the port is set to 22.
7. User: pi
Password: raspberry

Setting up Neo6M GPS with Raspberry Pi

At commandline
1. sudo apt-get update
2. sudo apt-get upgrade
3. sudo apt-get install gpsd gpsd-clients python-gpsd
4. sudo systemctl stop gpsd.socket
5. sudo systemctl disable gpsd.socket

Configuration of Raspberry Pi
1. sudo cp /boot/cmdline.txt /boot/cmdline.txt.bkp
2. sudo nano /boot/cmdline.txt and edit accordingly.
<!-- 
dwc_otg.lpm_enable=0 console=tty1 root=PARTUUID=c99b8a0b-02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait
 -->
 3. sudo nano /boot/config.txt and add accordingly.
 <!-- 
 enable_uart=1
 dtoverlay=pi3-miniuart-bt
  -->
 4. sudo reboot

Interacting with the Module
1. sudo stty -F /dev/serial0 9600
2. sudo cat /dev/serial0 //check that it is listening to values, if not check connections//
3. sudo gpsd -n /dev/serial0 -F /var/run/gsd.sock //start gpsd



