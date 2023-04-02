import unittest
from main import custom_sum


class test_main(unittest.TestCase):
    def test_sum(self):
        self.assertEqual(custom_sum(2, 3), 5)
