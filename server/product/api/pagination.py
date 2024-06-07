from rest_framework.pagination import PageNumberPagination


class CustomPaginationSet(PageNumberPagination):
    page_size = 4
    page_query_param = 'page'
    max_page_size = 1000