# project: p5
# submitter: gmcleod
# partner: none
# hours: 10
import pandas as pd
import netaddr
import time 
import json
import sys
import csv
import zipfile
from io import TextIOWrapper
import re
import geopandas

global locations
with open("ip2location.csv",newline = "") as f:
    locations = list(csv.reader(f))[2:]

def ip_check(*ip_addresses):
    global index
    index = 0
    ips = sorted(ip_addresses[0])
    return_list = []
    start = time.time()
    for i in ips:
        int_ip = int(netaddr.IPAddress(i))
        for j in range(index,len(locations)):
            start = time.time()
            if (int(locations[j][0]) <= int_ip) & (int(locations[j][1]) >= int_ip):
                return_list.append({"ip":i,"int_ip":int_ip,"region":locations[j][3],"ms":(time.time()-start)*1000})
                index = j
                break
    return_list_sorted = []
    for i in ip_addresses[0]:
        for j in return_list:
            if j["ip"] == i:
                return_list_sorted.append(j)
                return_list.pop(return_list.index(j))
                break
                
    return return_list_sorted
    
        
def zip_iter(g):
    with zipfile.ZipFile(g) as zf:
            for file in zf.namelist():
                with zf.open(file,"r") as f:
                    reader = csv.reader(TextIOWrapper(f))
                    for row in reader:
                        yield row

def sample(*args):
    args = args[0]
    reader = zip_iter(args[0])
    header = next(reader)
    
    with zipfile.ZipFile(args[1], "w") as zf:
        with zf.open(args[1].replace(".zip", ".csv"), "w") as raw:
            with TextIOWrapper(raw) as f:
                writer = csv.writer(f, lineterminator='\n')
                rows = []
                header = header + ["region"]
                line_count = 0
                ip_idx = header.index("ip")
                for row in reader:
                    if (line_count % int(args[2])) == 0:
                        rows.append(row + [ip_check([re.sub(r'([a-z]{3})','000',row[ip_idx])])[0]["region"]])
                    line_count+=1
                rows.sort(key=lambda x: int(netaddr.IPAddress(re.sub(r'([a-z]{3})','000',x[0]))))
                writer.writerow(header)
                for row in rows:
                    writer.writerow(row)
def world(*args):
    args = args[0]
    world = geopandas.read_file(geopandas.datasets.get_path('naturalearth_lowres'))
    world = world[world.name!="Antarctica"]
    reader = zip_iter(args[0])
    header = next(reader)
    region_idx = header.index("region")
    world["count"] = 0
    count = {}

    for region in world["name"]:
        count[region] = 0

    for row in reader:
        if row[region_idx] not in count:
            count[row[region_idx]] = 0
        count[row[region_idx]] += 1
    i = 0
    for region in world["name"]:
        world["count"][i] = count[region]
        i += 1

    ax = world.plot(column = "count",legend = True, figsize = (8,6))
    ax.get_figure().savefig(args[1])
    
def phone(*args):
    args = args[0]
    numbers = []
    with zipfile.ZipFile(args[0]) as zf:
        for files in zf.namelist():
            with zf.open(files,"r") as f:
                file = str(f.read(),encoding = "utf-8")
                file_numbers = re.findall(r"(\d{3}-\d{3}-\d{4}|\(\d{3}\).\d{3}-\d{4}|\(\d{3}\)\d{3}-\d{4})",file)
                for i in file_numbers:
                    if i not in numbers:
                        numbers.append(i)
                        print(i)
          
                    
def main():
    if len(sys.argv) < 2:
        print("usage: main.py <command> args...")
    elif sys.argv[1] == "ip_check":
        ips = sys.argv[2:]
        print(json.dumps(ip_check(ips)))
    # TODO: other commands
    elif sys.argv[1] == "sample":
        sample(sys.argv[2:])
    elif sys.argv[1] == "world":
        world(sys.argv[2:])
    elif sys.argv[1] == "phone":
        phone(sys.argv[2:])
        
    else:
        print("unknown command: "+sys.argv[1])
    

if __name__ == '__main__':
     main()                       