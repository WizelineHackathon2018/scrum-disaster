def algorithm_result(request):
  final_points = []
  totally_points = []
  all_difficults = [1,2,3,5,8,13]

  p,r,n = [],[],[]
  for arrays in request:
    p.append(arrays[0])
    r.append(arrays[1])
    n.append(arrays[2])

  d, s = [], []
  for num in range(0, len(p)):
    d.append(p[num] - r[num])
    s.append(p[num] + r[num])

  a = []
  for x in range(0, len(n)):
    a.append((d[x] * 100 / s[x]))

  ad = []
  for x in range(0, len(a)):
    ad.append([a[x], n[x]])

  zeros, pos, negs = [], [] , []

  for x in range(0, len(ad)):
    if ad[x][0] > 0:
      pos.append(ad[x])
    elif ad[x][0] < 0:
      negs.append(ad[x])
    else:
      zeros.append(ad[x])

  for x in pos:
    if x[0] >= 25 and x[0] < 50:
      penalization = (sorted(all_difficults, reverse=True)[all_difficults.index(x[1])] / 3) * 100
      final_points.append(penalization*-1)
    elif x[0] >= 50 and x[0] < 75:
      penalization = (sorted(all_difficults, reverse=True)[all_difficults.index(x[1])] / 2) * 100
      final_points.append(penalization*-1)
    elif x[0] >= 75:
      penalization = (sorted(all_difficults, reverse=True)[all_difficults.index(x[1])]) * 100
      final_points.append(penalization*-1)
    else:
      final_points.append(x[1]*100)

  for x in negs:
      x[0] = x[0] * - 1
      if x[0] >= 25 and x[0] < 50:
        penalization = (sorted(all_difficults, reverse=True)[all_difficults.index(x[1])] / 3) * 100
        final_points.append(penalization * -1)
      elif x[0] >= 50 and x[0] < 75:
        penalization = (sorted(all_difficults, reverse=True)[all_difficults.index(x[1])] / 2) * 100
        final_points.append(penalization*-1)
      elif x[0] >= 75:
        penalization = (sorted(all_difficults, reverse=True)[all_difficults.index(x[1])]) * 100
        final_points.append(penalization*-1)
      else:
        final_points.append(x[1]*100)

  for x in zeros:
    final_points.append(x[1]*200)

  for x in n:
    totally_points.append(x * 200)

  return [[sum(final_points), sum(totally_points)]]
