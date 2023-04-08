import unittest
from main import custom_sum


class test_main(unittest.TestCase):
    def test_sum_positive(self):
        self.assertEqual(custom_sum(2, 3), 5)

    def test_sum_negative(self):
        self.assertEqual(custom_sum(-2, 3), 1)
