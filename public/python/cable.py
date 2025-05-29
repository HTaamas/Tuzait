choice1 = input("Első hálózati eszköz(hub / switch / router / workstation):\n").lower()
choice2 = input("Második hálózati eszköz(hub / switch / router / workstation):\n").lower()

def getCable(device1, device2):
    if device1 == "hub" or device1 == "switch":
        if device2 == "hub" or device2 == "switch":
            return "Fordított kábel"
        elif device2 == "router" or device2 == "workstation":
            return "Sima kábel"
    elif device1 == "router" or device1 == "workstation":
        if device2 == "hub" or device2 == "switch":
            return "Sima kábel"
        elif device2 == "router" or device2 == "workstation":
            return "Fordított kábel"

print(getCable(choice1, choice2))