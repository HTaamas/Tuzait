import ipaddress

# Get user input for IP address and subnet mask
user_input = input("Add meg az ipt! (pl.: 192.168.0.1/24):\n")

# Create an IP interface object
ipi = ipaddress.ip_interface(user_input)

# Print the details
print("Address:", ipi.ip)
print("Mask:", ipi.netmask)
print("Hálózat:", str(ipi.network).split('/')[0])
print("Broadcast:", ipi.network.broadcast_address)