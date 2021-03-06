import csv
import json
import os

def main():

    appliances = []
    with open('data/appliances.csv', 'rt') as f:
        reader = csv.reader(f, delimiter='\t')
        skip_first = False
        for line in reader:
            if not skip_first:
                skip_first = True
                continue

            name = line[0]
            id = line[1]
            room = line[2]
            kw = line[3]
            count = line[4]
            total_kw = line[5]
            usage_time_per_day = line[6]
            units_per_day = line[7]
            time_of_day_usage = line[8]
            cost_per_day = line[9]

            obj = {
                'name': name,
                'id': id,
                'room': room,
                'kw': float(kw),
                'count': int(count),
                'total_kw': float(total_kw),
                'usage_time_per_day': float(usage_time_per_day),
                'units_per_day': float(units_per_day),
                'time_of_day_usage': int(time_of_day_usage),
                'cost_per_day': float(cost_per_day),
            }
            appliances.append(obj)

#    print json.dumps(appliances, indent=4)


    hourlies = {}
    for i in range(24):
        hourlies[ i ] = []
#         print 'doing hourlies[%s]...' % i
        for a in appliances:
            start_time = a['time_of_day_usage']
            end_time = int(a['time_of_day_usage'] + a['usage_time_per_day'])
#             print 'appliance: %s, start: %s, end: %s, current: %s' % (a['name'], start_time, end_time, i)
            if i >= start_time and i <= end_time:
#                print 'matching: %s' % a['name']
               hourlies[ i ].append(a)

#     print json.dumps(hourlies, indent=4)
#     return

    radiations = {}
    with open('data/solar radiation.csv', 'r') as f:
        reader = csv.reader(f)
        for line in reader:
            if len(line) != 6:
                continue

            if line[2] not in radiations:
                radiations[ line[2] ] = []
            
            timestamp = line[1]
            date = line[2]
            time = line[3]
            power = line[4]

            hour = int(time.split(':')[0])
            h = hourlies[ hour ]
            running = {}
            for obj in h:
                if obj['room'] not in running:
                    running[ obj['room'] ] = {
                        'room': obj['room'],
                        'total_kw': 0
                    }
                running[ obj['room'] ]['total_kw'] += obj['total_kw']
            
            apps = [{'id': obj['id'], 'state': 1 if obj['id'] in running else 0} for obj in appliances ]
                

            radiations[ line[ 2 ]].insert(0, {
#                'timestamp': timestamp,
#                 'date': date,
                'hour': hour,
                'kw': round(float(power) / 1000, 5),
                'appliances': running
            })

        radiations_24 = []
        hours = []
        key = next(iter(radiations))
        
        for r in radiations[ key ]:
            if r['hour'] in hours:
                continue

            hours.append(r['hour'])
            radiations_24.append(r)

            print json.dumps(radiations_24, indent=4)
        return

    # dont overwrite data.json for now
    with open('./output/data.json', 'w') as outfile:
        print json.dumps(radiations['2016-09-30'], indent=4)
        json.dump(radiations, outfile, indent=4)

    with open('./output/appliances.json', 'w') as outfile:
        json.dump(appliances, outfile, indent=4)

if __name__ == '__main__':
	main()
