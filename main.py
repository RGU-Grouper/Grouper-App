# Grouper - App for creating sub-groups of people

import random

def main():
	pass


class Grouper:
	def __init__(self):
		self.groupee_list = []
		self.group_size = 3
		self.groups = []

	def add_groupee(self, name):
		self.groupee_list.append(name)

	def remove_groupee(self, name):
		if name in self.groupee_list:
			self.groupee_list.remove(name)

	def create_groups(self):
		group_count = len(self.groupee_list) // self.group_size

		random.shuffle(self.groupee_list)
		index = 0
		for groupee in self.groupee_list:
			self.groups[index % group_count].append(groupee)
			index += 1


if __name__ == "__main__":
	main()
